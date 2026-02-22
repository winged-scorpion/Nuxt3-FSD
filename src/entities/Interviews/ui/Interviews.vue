<script setup lang="ts">
import { DeleteIcon, EditIcon, UploadIcon } from '~/shared/ui/Icon'
import { useInterviews } from '~/entities/Interviews/store/useInterviews'
import emitter from '~/shared/api/eventBus'
import { EditQuestion } from '~/shared/ui/UiModal'

const interviews = useInterviews()

function edit(tag: string, index: number, q: string, a: string) {
  emitter.emit('openModal', { components: EditQuestion, props: { topic: tag, position: index, question: q, answer: a } })
}
onMounted(() => {
  console.log('------------111-', interviews.setInterviews)
})
</script>

<template>
  <div class="tabs-head">
    <strong>Вопросы-ответы</strong>
    <button
      class="svg-icon rotate180"
      @click="interviews.getInterview()"
    >
      <UploadIcon />
    </button>
  </div>
  <hr class="mb-5">
  <div>
    <div
      v-for="question in interviews.outInterview"
      :key="question.tag"
      class="question"
    >
      <details>
        <summary>{{ question.name }}</summary>
        <ol class="question__list">
          <li
            v-for="(item, index) in question.list"
            :key="index"
          >
            <span>{{ index + 1 }}) {{ item.question }}</span>
            <span>
              <button
                class="svg-icon"
                @click="edit(question.tag, index, item.question, item.answer)"
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
      </details>
      <hr class="mb-5">
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabs-head{
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.question{
  summary{
    cursor: pointer;
  }
  ol{
    padding: 0 0 0 10px;
  }
  li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin:5px 0;
  }
  span{
    display: flex;
  }
}
</style>
