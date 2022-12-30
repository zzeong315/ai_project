import tensorflow as tf
from tensorflow.python.keras import backend as K
from tensorflow.python.keras.models import Model
from tensorflow.python.keras.layers import Input, Dense, TimeDistributed
from models.nlu_model import NLUModel
from layers.albert_layer import AlbertLayer
import numpy as np
import os
import json

class JointBertModel(NLUModel):

    def __init__(self, slots_num, intents_num, bert_hub_path, sess, num_bert_fine_tune_layers=10,
                 is_bert=False, is_training=True):
        self.slots_num = slots_num
        self.intents_num = intents_num
        self.bert_hub_path = bert_hub_path
        self.num_bert_fine_tune_layers = num_bert_fine_tune_layers
        self.is_bert = is_bert
        self.is_training = is_training

        self.model_params = {
                'slots_num': slots_num,
                'intents_num': intents_num,
                'bert_hub_path': bert_hub_path,
                'num_bert_fine_tune_layers': num_bert_fine_tune_layers,
                'is_bert': is_bert
                }

        self.build_model()
        self.compile_model()

        self.initialize_vars(sess)


    def compile_model(self):

        optimizer = tf.keras.optimizers.Adam(lr=5e-5)

        losses = {
        	'time_distributed': 'sparse_categorical_crossentropy',
        	'intent_classifier': 'sparse_categorical_crossentropy',
        }

        loss_weights = {'time_distributed': 0.0, 'intent_classifier': 4.0}

        metrics = {'intent_classifier': 'acc'}

        self.model.compile(optimizer=optimizer, loss=losses, loss_weights=loss_weights, metrics=metrics)
        self.model.summary()


    def build_model(self):
        in_id = Input(shape=(None,), dtype=tf.int32, name='input_ids')
        in_mask = Input(shape=(None,), dtype=tf.int32, name='input_masks')
        in_segment = Input(shape=(None,), dtype=tf.int32, name='segment_ids')
        bert_inputs = [in_id, in_mask, in_segment]

        bert_pooled_output, bert_sequence_output = AlbertLayer(
           fine_tune=True if self.num_bert_fine_tune_layers > 0 else False,
           albert_path=self.bert_hub_path,
           pooling='mean', name='AlbertLayer')(bert_inputs)

        intents_fc = Dense(self.intents_num, activation='softmax', name='intent_classifier')(bert_pooled_output)

        slots_output = TimeDistributed(Dense(self.slots_num, activation='softmax'))(bert_sequence_output)

        print('slots output :', slots_output.shape)

        self.model = Model(inputs=bert_inputs, outputs=[slots_output, intents_fc])


    def fit(self, X, Y, validation_data=None, epochs=5, batch_size=64):
        X = (X[0], X[1], X[2])
        if validation_data is not None:
            X_val, Y_val = validation_data
            validation_data = ((X_val[0], X_val[1], X_val[2]), Y_val)

        history = self.model.fit(X, Y, validation_data=validation_data,
                                 epochs=epochs, batch_size=batch_size)

    def initialize_vars(self, sess):
        sess.run(tf.compat.v1.local_variables_initializer())
        sess.run(tf.compat.v1.global_variables_initializer())
        K.set_session(sess)


    def predict_slots_intent(self, x, slots_vectorizer, intent_vectorizer, remove_start_end=True):

        input_ids = x[0]
        y_slots, y_intent = self.predict(x)

        slots = slots_vectorizer.inverse_transform(y_slots, input_ids)

        y_slots = np.array(y_slots)
        slots_score = np.array([[np.max(a) for a in y_slots[i][1:(len(slots[i])+1)]] for i in range(y_slots.shape[0])])

        first_intents_score = np.array([np.max(y_intent[i]) for i in range(y_intent.shape[0])])
        first_intents = np.array([intent_vectorizer.inverse_transform([np.argmax(y_intent[i])])[0] for i in range(y_intent.shape[0])])
        second_intents_score = np.array([np.sort(y_intent[i])[-2] for i in range(y_intent.shape[0])])
        second_intents = np.array([intent_vectorizer.inverse_transform([np.argsort(y_intent[i])[-2]])[0] for i in range(y_intent.shape[0])])

        return slots, first_intents, first_intents_score, second_intents, second_intents_score, slots_score

    def predict_slots_intent_allsenets(self, x, slots_vectorizer, intent_vectorizer, remove_start_end=True):

        input_ids = x[0]
        y_slots, y_intent = self.predict(x)


        slots = slots_vectorizer.inverse_transform(y_slots, input_ids)


        y_slots = np.array(y_slots)
        slots_score = np.array([[np.max(a) for a in y_slots[i][1:(len(slots[i])+1)]] for i in range(y_slots.shape[0])])

        first_intents_score = np.array([np.max(y_intent[i]) for i in range(y_intent.shape[0])])
        first_intents = np.array([intent_vectorizer.inverse_transform([np.argmax(y_intent[i])])[0] for i in range(y_intent.shape[0])])
        second_intents_score = np.array([np.sort(y_intent[i])[-2] for i in range(y_intent.shape[0])])
        second_intents = np.array([intent_vectorizer.inverse_transform([np.argsort(y_intent[i])[-2]])[0] for i in range(y_intent.shape[0])])

        return slots, first_intents, first_intents_score, second_intents, second_intents_score, slots_score

    def save(self, model_path):
        with open(os.path.join(model_path, 'params.json'), 'w') as json_file:
            json.dump(self.model_params, json_file)
        self.model.save(os.path.join(model_path, 'joint_bert_model.h5'))

    def load(load_folder_path, sess):
        with open(os.path.join(load_folder_path, 'params.json'), 'r') as json_file:
            model_params = json.load(json_file)

        slots_num = model_params['slots_num']
        intents_num = model_params['intents_num']
        bert_hub_path = model_params['bert_hub_path']
        num_bert_fine_tune_layers = model_params['num_bert_fine_tune_layers']
        is_bert = model_params['is_bert']

        new_model = JointBertModel(slots_num, intents_num, bert_hub_path, sess, num_bert_fine_tune_layers, is_bert, is_training=False)
        new_model.model.load_weights(os.path.join(load_folder_path,'joint_bert_model.h5'))
        return new_model
