<script setup lang="ts">
import { AddIcon, DeleteIcon, EditIcon, ShowHideIcon, UploadIcon } from '~/shared/ui/Icon'
import { useInterviews } from '~/entities/Interviews/store/useInterviews'
import emitter from '~/shared/api/eventBus'
import { EditQuestionTopic, FormQuestion } from '~/shared/ui/UiModal'
import {useApiFetch} from "~/shared/api/useApiFetch";

const interviews = useInterviews()
const showHideIcon = ref(false)

function edit(tag: string, id: string, q: string, a: string, au: string, sh: number) {
  emitter.emit('openModal', { components: FormQuestion, props: { api: 'edit', topic: tag, position: id, question: q, answer: a, linkAudio: au, show: sh } })
}
function editTopic(tag: string, n: string) {
  emitter.emit('openModal', { components: EditQuestionTopic, props: { topic: tag, topicHead: n } })
}
function addQuestion() {
  emitter.emit('openModal', { components: FormQuestion, props: { api: 'add' } })
}
function showHide() {
  showHideIcon.value = !showHideIcon.value
}

function deleteQuestion(item: string) {
  interviews.deleteQuestion(item)
}

async function del() {
  const {data, error, status} = await useApiFetch(`/api/delete`, {
    cache: 'no-cache',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (data) {
    if (data.success) {

    }
  }
}

onMounted(() => {
  interviews.getInterview()
})
</script>

<template>
  <div class="tabs-head">
    <div class="group">
      <strong><button @click="del">оаоаоаоаоа</button>Вопросы-ответы</strong>

      <button
        class="svg-icon rotate180"
        @click="interviews.getInterview()"
      >
        <UploadIcon />
      </button>
    </div>
    <div class="group">
      <strong>
        Создать вопрос
      </strong>
      <button
        class="svg-icon"
        @click="addQuestion"
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
              @click="edit(question.tag, item.id, item.question, item.answer, item.audio, item.show)"
            >
              <EditIcon />
            </button>
            <button
              class="svg-icon"
              @click="deleteQuestion(item.id)"
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
