## AI Document

## Model

- ALBERT(A Lite BERT)

## EDA

[데이터 형변환](train_set.ipynb)

- 한국어 처리 - python-mecab-ko  
  </br>
- 토큰화
  - sentencepiece

## Model detail

- 주어진 기존 모델과 데이터 셋은 감성 분석과 챗봇을 더한 모델을 기준으로 만들어져 있었기 때문에 서비스에 맞게 감성 분석에 초점을 맞춰서 fine tuning 진행
- 모델은 6가지 감정에 대해 test_set에서 65%의 정확도를 보였으며 오답 중 슬픔과 불안의 감정에서 오답이 다수 포진
- 슬픔, 불안에 대해 추가적인 모델 학습을 진행하였으며 기존 모델에 더해 모델을 구성

## Running the app

```bash
cd team05/ai
sudo docker build -t {image_name}:{tag_name} /home/elice/team05/ai/
sudo docker compose up -d
```

## Reference

- [데이터 셋 및 기본 모델](https://aihub.or.kr/aihubdata/data/view.do?currMenu=116&topMenu=100&aihubDataSe=ty&dataSetSn=86)
- [Original implementation](https://github.com/strongio/keras-bert/blob/master/keras-bert.ipynb)

</br>

### Folder Structure

```bash
├─albert-module
│  ├─assets
│  └─variables
├─data
│  ├─test
│  ├─test35
│  ├─train
│  └─train35
├─data_text
├─layers
├─models
├─saved_model
├─saved_model35
└─vectorizers
```
