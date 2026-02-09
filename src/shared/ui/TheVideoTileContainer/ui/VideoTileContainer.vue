<script setup lang="ts">
import { computed } from 'vue'
import type { VideoList } from '~/pages/ItKitchenPage/model'
import { useModal } from '~/shared/store/useModal'
import { useVideo } from '~/shared/ui/TheVideoTileContainer/store/useVideo'

const video = useVideo()
await video.getVideo()

const itKitchen = computed((): VideoList[] | null => {
  return video.outVideo ? video.outVideo : null
})

const modalState = useModal()

function setVideoId(item: VideoList) {
  modalState.initVideoModal(item)
}
</script>

<template>
  <div class="player player-wrap">
    <div
      v-for="(item, index) in itKitchen"
      :key="index"
      class="player__tile"
    >
      <div
        class="player__card"
        @click="setVideoId(item)"
      >
        <v-icon class="player__play">
          mdi-play-box
        </v-icon>
        <img
          :src="item.img"
          :alt="item.description"
        >
      </div>
      <div class="player__description">
        {{ item.description }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.player {
  &__tile {
    position: relative;
    width: 32%;
    margin-bottom: 15px;

    &:before {
      content: '';
      display: block;
      width: 40px;
      height: 40px;
      background: #fff;
      position: absolute;
      right: 0;
      top: 160px;
      border-radius: 40px 0 0 0;
      z-index: 2;
      border-top: solid 2px rgb(95, 158, 160);
      border-left: solid 2px rgb(95, 158, 160);
    }

    &:has(.player__card) {
      &:hover {
        &:before {
          border-top: solid 2px red;
          border-left: solid 2px red;
        }
      }
    }
  }

  &-wrap {
    margin: 25px 0;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 2%
  }

  &__card {
    height: 200px;
    min-width: 450px;
    background: #5f9ea091;
    display: flex;
    align-items: end;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    border-radius: 40px 0 0 0;
    position: relative;
    overflow: hidden;
    border: solid 2px rgb(95, 158, 160);

    &:hover {
      background: rgb(95 158 160);
      border: solid 2px red;

      i {
        opacity: 1;
      }
    }

    img {
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  &__play {
    z-index: 4;
    font-size: 85px;
    color: red;
    position: absolute;
    top: 50%;
    margin: -43px auto;
    left: 0;
    right: 0;
    opacity: 0;
    transition: 0.3s;
  }

  &__description {
    padding: 10px 0 0 0;
    font-size: 16px;
    position: relative;
    z-index: 3;
    text-shadow: 1px 1px #5f9ea0;
  }
}
</style>
