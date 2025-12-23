<script setup lang="ts">

import {BASE_COLOR, INPUT_TYPE} from "../api/constant"
import { Input } from "~/shared/ui/BaseInput";
import {getJsonFunction} from "~/shared/api/base/getJson";
import type {Question, QuestionFull} from "../model/index"
import { Button } from "~/shared/ui/BaseButton";
import {defineAsyncComponent, ref} from "vue";

const baseQuestionList = await getJsonFunction('interview'),
    sortQuestionList = reactive(<QuestionFull[]>[]),
    setListQuestions = reactive(<Question[]>[]),
    itemQuestionArr = reactive(<Question>{}),
    playStop = ref(true),
    progressBarModel = ref(0),
    audioLink = ref(''),
    interviewData = reactive({
      timeInterview: '1'
    }),
    schema = {
      interval: {
        as: 'interval',
        name: 'interval',
        value: '1',
      }
    }

let asyncModalWithOptions: any,
    questionIntervalFunction: any

function shuffleTopics() {
  sortQuestionList.sort(() => Math.random() - 0.5)
}

function shuffleQuestion() {
  sortQuestionList.forEach((item) => {
    item.list.sort(() => Math.random() - 0.5)
  })
}

function sortTopicsTag(tag: string, checked: boolean) {
  if (checked) {
    let itemTopic = baseQuestionList.find((item) => {
      if (item.tag === tag) {
        return item
      }
    })
    sortQuestionList.push(itemTopic)
  } else {
    sortQuestionList.forEach((elDelete, index) => {
      if (elDelete.tag === tag) {
        sortQuestionList.splice(index, 1)
      }
    })
  }
}

function calkInterval(dopTime: number = 1) {
  return (Number(interviewData.timeInterview) * 1000) * dopTime
}

function callAudio(question: Question | undefined) {
  if(question === undefined) return false
  Object.assign(itemQuestionArr,question)
  audioLink.value = question.audio
  asyncModalWithOptions = defineAsyncComponent({
    loader: () => import('~/shared/ui/BaseAudio/ui/Audio.vue'),
  })
}

function itemQuestion(reset: boolean = false ) {
  progressBarModel.value = ++progressBarModel.value;
  if (progressBarModel.value >= 100) {
    progressBarModel.value = 0
  }
  if(reset){
    progressBarModel.value = 0
  }
}

function startInterview(event: boolean) {
  if (setListQuestions.length === 0) {
    Object.assign(setListQuestions, sortQuestionList.map(item => item.list).flat());
  }
  if (event) {
    questionIntervalFunction = setInterval(() => {
      itemQuestion();
    }, calkInterval());
    callAudio(setListQuestions.shift());
    playStop.value = false
  } else {
    clearInterval(questionIntervalFunction)
    playStop.value = true
    return false;
  }
}

function nextQuestion() {
  callAudio(setListQuestions.shift());
  itemQuestion(true)
}
function stop(){
  itemQuestion(true)
  clearInterval(questionIntervalFunction)
  setListQuestions.length = 0
  itemQuestionArr.question = ''
  playStop.value = true
}
</script>

<template>
  <div class="pageContainer">
    <div class="interview">
      <div class="interview__sidebar">
        <div class="interview__control __controlMix">
          <label>
            <span>
              Интервал между вопросами в минутах
            </span>
            <Input
                v-model="interviewData.timeInterview"
                :schema="schema.interval"
                :inputType="INPUT_TYPE.number"
                :value="interviewData.timeInterview"
            />
          </label>
          <Button
              @click="shuffleTopics()"
          >Перемешать темы
          </Button>

          <Button
              @click="shuffleQuestion()"
          >Перемешать вопросы в темах
          </Button>
        </div>
        <div class="interview__control">
          <label
              class="checkbox"
              v-for="topic of baseQuestionList"
          >
            <v-checkbox
                density="compact"
                hide-details
                :color="BASE_COLOR"
                @change="sortTopicsTag(topic.tag,$event.target.checked)"
                multiple
            />
            <span>{{ topic.name }}</span>
          </label>
        </div>
      </div>
      <div class="interview__slider-container">
        <div
            class="interview__tags"
            v-if="sortQuestionList.length !== 0"
        >
          <div
              class="interview__tags-item"
              v-for="topic in sortQuestionList"
          >
            {{ topic.name }}<br>
            <span>Вопросов {{ topic.list.length }}</span>
          </div>

        </div>
        <div class="interview__slider">
          <div class="slide">
            <strong class="slide__head">Вопрос</strong>
            <v-progress-linear
                v-model="progressBarModel"
                height="16px"
                class="progressBar"
            ></v-progress-linear>
            <component
                v-if="audioLink.length !== 0"
                :is="asyncModalWithOptions"
                :audio-link="audioLink"
            />
            <details class="slide__body">
              <summary class="slide__accordion">{{itemQuestionArr.question}}</summary>
              <br>
              <div class="slide__down">
                {{itemQuestionArr.answer}}
              </div>
            </details>
          </div>
        </div>
        <div class="interview__button">
          <Button
              class="button"
              :disabled='sortQuestionList.length === 0'
          >
            <span
                v-if="playStop"
                @click="startInterview(true)"
            >Старт</span>
            <span
                v-else
                @click="startInterview(false)"
            >Пауза</span>
          </Button>
          <Button
              v-if="!playStop"
              @click="nextQuestion"
          >
            Следующий
          </Button>
          <Button
              class="button"
              @click="stop"
          >
            Сброс
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.v-progress-linear__determinate {
  background: rgb(95, 158, 160);
}
</style>
<style scoped lang="scss">
.progressBar {
  background: #5f9ea036;
  border-radius: 10px 10px 0 0;
  margin-bottom: -6px;
  z-index: 1;
  position: relative;
}

.slide {
  &__body {
    width: 500px;
    padding: 15px;
    border-radius: 10px;
    border: solid 2px rgba(95, 158, 160, 0.2117647059);
    z-index: 2;
    background: #fff;
    border-top: none;
    position: relative;
  }

  &__accordion {
    background: rgb(95 158 160 / 10%);
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
    border: solid 2px #5f9ea036;
  }

  &__head {
    margin-bottom: 10px;
    display: block;
  }

  &__down {
    padding: 10px;
    border: solid 2px rgba(95, 158, 160, 0.2117647059);
    border-radius: 5px;
    background: rgba(95, 158, 160, 0.1);
  }
}

.interview {
  display: flex;
  gap: 20px;

  &__button {
    position: absolute;
    bottom: 0;
    left: 15px;
    right: 15px;
    z-index: 2;
    display: flex;
    justify-content: center;
    gap: 15px;
    border-radius: 10px 10px 0 0;
    border: solid 3px #5f9ea036;
    border-bottom: none;
    padding: 15px;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    padding: 15px;
    border-radius: 0 0 10px 10px;
    border: solid 3px #5f9ea036;
    border-top: none;
    position: relative;
    z-index: 2;

    &-item {
      font-size: 12px;
      padding: 5px;
      border: solid 1px #5f9ea036;
      border-radius: 5px;

      span {
        color: rgb(95 158 160);
      }
    }
  }

  &__sidebar {
    width: 20%;
  }

  &__control {
    border: solid 4px #5f9ea036;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 20px;

    &:last-of-type {
      margin-bottom: 0;
    }

    button {
      width: 100%;
      border: solid 2px rgb(95, 158, 160);
      border-top: none;
      border-left: none;
      transition: 1s;
      &:active {
        border: solid 1px red;
      }
    }
    &.__controlMix {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      font-size: 14px;
    }
  }

  &__slider-container {
    width: 80%;
    border: solid 4px #5f9ea036;
    padding: 0 15px 15px 15px;
    border-radius: 10px;
    position: relative;
  }

  &__slider {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    bottom: 70px;
    z-index: 1;
  }
}

.checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover{
    span{
      text-shadow: 1px -1px 16px rgb(95 158 160);
    }
  }
}

</style>
