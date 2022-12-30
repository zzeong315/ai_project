from flask import Flask, request
app = Flask(__name__)
from vectorizers.bert_vectorizer import BERTVectorizer
from models.joint_bert import JointBertModel
from vectorizers.tags_vectorizer import TagsVectorizer
from vectorizers import albert_tokenization
from sub_model import sub_model

import os
import pickle
import tensorflow as tf
from mecab import MeCab

load_folder_path = 'saved_model'
mecab = MeCab()

config = tf.ConfigProto(intra_op_parallelism_threads=8,
                        inter_op_parallelism_threads=0,
                        allow_soft_placement=True,
                        device_count = {'GPU': 1})
sess = tf.Session(config=config)

bert_model_hub_path = './albert-module'
is_bert = False
tokenizer = albert_tokenization.FullTokenizer('./albert-module/assets/v0.vocab')

bert_vectorizer = BERTVectorizer(sess, is_bert, bert_model_hub_path)

with open(os.path.join(load_folder_path, 'tags_vectorizer.pkl'), 'rb') as handle:
    tags_vectorizer = pickle.load(handle)
    slots_num = len(tags_vectorizer.label_encoder.classes_)
with open(os.path.join(load_folder_path, 'intents_label_encoder.pkl'), 'rb') as handle:
    intents_label_encoder = pickle.load(handle)
    intents_num = len(intents_label_encoder.classes_)

model = JointBertModel.load(load_folder_path, sess)

@app.route("/", methods=["GET"])
def listen():
    data_text = " ".join(tokenizer.tokenize(' '.join(mecab.morphs(request.args.get("sentence")))))
    data_text = data_text.replace('##', '')
    data_tags = ' '.join(['O' for _ in range(len(data_text.split()))])
    data_text_arr = [data_text]
    data_tags_arr = [data_tags]
    data_input_ids, data_input_mask, data_segment_ids, _ = bert_vectorizer.transform(data_text_arr)

    tags_vectorizer = TagsVectorizer()
    tags_vectorizer.fit(data_tags_arr)
    data_tags_arr = tags_vectorizer.transform(data_tags_arr, data_input_ids)
    
    return get_results(data_input_ids, data_input_mask, data_segment_ids, tags_vectorizer, intents_label_encoder)

def get_results(input_ids, input_mask, segment_ids, tags_vectorizer, intents_label_encoder):
    emotion = {0:'기쁨',1:'당황',2:'분노',3:'불안',4:'상처',5:'슬픔'}
    with sess.as_default():
        with sess.graph.as_default():
            _, first_inferred_intent, _, _, _, _ = model.predict_slots_intent([input_ids, input_mask, segment_ids], tags_vectorizer, intents_label_encoder)
    if int(first_inferred_intent[0].strip()) in [3,5]:
        intent = sub_model([input_ids, input_mask, segment_ids])
        return emotion[intent]

    return emotion[int(first_inferred_intent[0].strip())]

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3306)