<script setup lang="ts">
import { AddIcon, DeleteIcon, EditIcon, ShowHideIcon, UploadIcon } from '~/shared/ui/Icon'
import { useInterviews } from '~/entities/Interviews/store/useInterviews'
import emitter from '~/shared/api/eventBus'
import {EditQuestion, EditQuestionTopic} from '~/shared/ui/UiModal'

const interviews = useInterviews()
const showHideIcon = ref(false)

function edit(tag: string, index: number, q: string, a: string, au: string) {
  emitter.emit('openModal', { components: EditQuestion, props: { topic: tag, position: index, question: q, answer: a, linkAudio: au } })
}
function editTopic(tag: string, n: string) {
  emitter.emit('openModal', { components: EditQuestionTopic, props: { topic: tag, topicHead: n } })
}
function showHide() {
  showHideIcon.value = !showHideIcon.value
}
const del = [
  {
    tag: '',
    name: '',
    show: true,
    list: [
      {
        question: '',
        answer: '',
        audio: '',
        show: true,
      },
      {
        question: '',
        answer: '',
        audio: '',
        show: true,
      },
    ],
  },
  {
    tag: '',
    name: '',
    show: true,
    list: [
      {
        question: '',
        answer: '',
        audio: '',
        show: true,
      },
      {
        question: '',
        answer: '',
        audio: '',
        show: true,
      },
    ],
  },
]
onMounted(() => {

})
</script>

<template>
  <div class="tabs-head">
    <div class="group">
      <strong>Вопросы-ответы</strong>
      <button
        class="svg-icon rotate180"
        @click="interviews.getInterview()"
      >
        <UploadIcon />
      </button>
    </div>
    <div class="group">
      <strong>
        Создать тему
      </strong>
      <button
        class="svg-icon"
      >
        <AddIcon />
      </button>
    </div>
  </div>
  <hr class="mb-3">
  <div
    v-for="question in interviews.outInterview"
    :key="question.tag"
    class="question"
  >
    <details>
      <summary>
        <strong>{{ question.name }}</strong>
      </summary>
      <ol>
        <li
          v-for="(item, index) in question.list"
          :key="index"
        >
          <span>{{ index + 1 }}) {{ item.question }}</span>
          <span class="group">
            <button
              class="svg-icon"
              @click="showHide"
            >
              <ShowHideIcon
                :show="item.show"
              />
            </button>
            <button
              class="svg-icon"
              @click="edit(question.tag, index, item.question, item.answer, item.audio)"
            >
              <EditIcon />
            </button>
            <button
              class="svg-icon"
            >
              <DeleteIcon />
            </button>
          </span>
        </li>
      </ol>
      <hr class="mb-3 mt-3">
      <div class="edit-group group">
        <strong>
          Редактировать тему: {{ question.name }}
        </strong>
        <div class="group">
          <button
            class="svg-icon"
            @click="showHide"
          >
            <ShowHideIcon
              :show="question.show"
            />
          </button>
          <button
            class="svg-icon"
            @click="editTopic(question.tag, question.name)"
          >
            <EditIcon />
          </button>
          <button
            class="svg-icon"
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </details>
    <hr class="mb-3">
  </div>
</template>

<style scoped lang="scss">
.tabs-head{
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.edit-group{
  padding: 0 5px 10px 25px;
}

.group{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.question{
  summary{
    cursor: pointer;
    padding-bottom: 5px;
  }
  ol{
    padding: 0 0 0 10px;
  }
  li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    &:hover{
      background: rgb(95 158 160 / 9%);
    }
  }
  span{
    display: flex;
  }
}
</style>
