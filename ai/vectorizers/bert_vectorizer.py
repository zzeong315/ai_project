import tensorflow as tf
import numpy as np
from vectorizers import albert_tokenization
class BERTVectorizer:
    
    def __init__(self, sess, is_bert,
                 bert_model_hub_path="./bert-module"):

        self.sess = sess
        self.is_bert = is_bert
        self.bert_model_hub_path = bert_model_hub_path
        self.tokenizer = albert_tokenization.FullTokenizer('./albert-module/assets/v0.vocab')
    
    def transform(self, text_arr):

        input_ids = []
        input_mask = []
        segment_ids = []

        for text in text_arr: 

            ids, mask, seg_ids= self.__vectorize(text.strip())

            input_ids.append(ids)
            input_mask.append(mask)
            segment_ids.append(seg_ids)

        sequence_lengths = np.array([len(i) for i in input_ids])            
        input_ids = tf.keras.preprocessing.sequence.pad_sequences(input_ids, padding='post')
        input_mask = tf.keras.preprocessing.sequence.pad_sequences(input_mask, padding='post')
        segment_ids = tf.keras.preprocessing.sequence.pad_sequences(segment_ids, padding='post')
        return input_ids, input_mask, segment_ids, sequence_lengths
    
    
    def __vectorize(self, text: str):

        tokens = text.split()
        tokens.insert(0, '[CLS]')
        tokens.append('[SEP]')

        segment_ids = [0] * len(tokens)
        input_ids = self.tokenizer.convert_tokens_to_ids(tokens)

        input_mask = [1] * len(input_ids)
        
        return input_ids, input_mask, segment_ids
        
