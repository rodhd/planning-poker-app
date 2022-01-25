<template>
  <div class="flex items-center justify-center h-screen">
    <div>
      {{sessionId}}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent( {
  props: {
    sessionId: String
  }
})
</script>