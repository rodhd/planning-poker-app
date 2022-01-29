<template>
  <div v-show="isActive" class="fixed inset-0 w-full h-screen flex items-center justify-center bg-black/75">
    <div class="w-full max-w-2xl bg-blue-300 shadow-lg rounded-lg p-8">
      <input 
        class="
          mt-1
          block
          w-full
          rounded-md
          bg-gray-100
          border-transparent
          focus:border-gray-500 focus:bg-white focus:ring-0"
        type="text"
        placeholder="Enter code"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
  props: {
    isActive: Boolean
  }
})
</script>