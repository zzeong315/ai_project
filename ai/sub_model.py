from models.joint_bert import JointBertModel
import tensorflow as tf
import pickle
import os

def sub_model(x):
    config = tf.ConfigProto(intra_op_parallelism_threads=8,
                            inter_op_parallelism_threads=0,
                            allow_soft_placement=True,
                            device_count = {'GPU': 1})
    sess = tf.Session(config=config)

    load_folder_path = 'saved_model35'

    with open(os.path.join(load_folder_path, 'tags_vectorizer.pkl'), 'rb') as handle:
        tags_vectorizer = pickle.load(handle)
    with open(os.path.join(load_folder_path, 'intents_label_encoder.pkl'), 'rb') as handle:
        intents_label_encoder = pickle.load(handle)

    model = JointBertModel.load(load_folder_path, sess)
    with sess.as_default():
        with sess.graph.as_default():
            _, intent, _, _, _, _ = model.predict_slots_intent(x, tags_vectorizer, intents_label_encoder)
    
    return int(intent[0].strip())