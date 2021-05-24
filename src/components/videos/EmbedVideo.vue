<template>
  <div>
    <!-- YouTube動画の埋め込み -->
    <iframe
    width="100%"
    min-width="315"
    :height="height"
    :src="youtubeEmbeded"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>

  </div>
</template>

<script>
export default {
  props: ['video', 'height'],
  computed: {
    youtubeEmbeded () {
      return `https://www.youtube.com/embed/${this.$props.video.youtubeVideoId}`
    }
  }
}
</script>
