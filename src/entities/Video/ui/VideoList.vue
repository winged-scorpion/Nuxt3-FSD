<script setup lang="ts">
import { AddIcon, DeleteIcon, EditIcon, ShowHideIcon, UploadIcon } from '~/shared/ui/Icon'
import { useVideos } from '~/entities/Video/store/useVideo'
import emitter from '~/shared/api/eventBus'
import { AddVideo, EditVideo } from '~/shared/ui/UiModal'

const videos = useVideos()

</script>

<template>
  <div class="tabs-head">
    <div class="group">
      <strong>Видео с кухни</strong>
      <button
        class="svg-icon rotate180"
        @click="videos.getVideo"
      >
        <UploadIcon />
      </button>
    </div>
    <div class="group">
      <strong>
        Добавить видео
      </strong>
      <button
        class="svg-icon"
        @click="emitter.emit('openModal', { components: AddVideo, props: null })"
      >
        <AddIcon />
      </button>
    </div>
  </div>
  <hr class="mb-5">
  <ul class="video">
    <li
      v-for="(video, index) in videos.outVideo"
      :key="index"
    >
      <span>{{ index }}) {{ video.description }} </span>
      <span>
        <button
          class="svg-icon"
        >
          <ShowHideIcon />
        </button>
        <button
          class="svg-icon"
          @click="emitter.emit('openModal', { components: EditVideo, props: { videoId: video.id, description: video.description, link: video.link, img: video.img } })"
        >
          <EditIcon />
        </button>
        <button
          class="svg-icon"
          @click="videos.deleteVideo(video.id)"
        >
          <DeleteIcon />
        </button>
      </span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.group{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tabs-head{
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.video{
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
