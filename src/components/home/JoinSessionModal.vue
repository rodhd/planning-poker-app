<template>
  <div v-show="isActive" class="fixed inset-0 w-full h-screen flex items-center justify-center bg-black/50">
    <div class="flex flex-col w-full max-w-2xl bg-blue-500 shadow-lg rounded-lg p-8">
      <input 
        class="
          mt-1
          mb-2
          block
          w-full
          rounded-md
          bg-gray-100
          focus:bg-white 
          focus:ring-0"
        :class="[
          sessionIdIsInvalid ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-gray-500'
        ]"
        type="text"
        placeholder="Enter code"
        v-model="sessionId"
      />
      <p v-if="showWarning" class="text-red-500">Session ID is invalid!</p>
      <div>
        <button
          class="
            py-4
            px-2
            mr-2
            font-semibold
            text-white
            rounded
            shadow
            w-1/3"
          :class="[
            sessionIdIsInvalid ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-300'
          ]"
          @click="openSession"
          :disabled="sessionIdIsInvalid"
          >
          Join
        </button>
        <button
          class="
            py-4
            px-2
            bg-red-500
            hover:bg-red-300
            font-semibold
            text-white
            rounded
            shadow
            w-1/3"
          @click="closeModal"
          >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getSession } from "@/api/sessions";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    isActive: Boolean
  },
  data() {
    return {
      sessionId: '',
      showWarning: false
    }
  },
  computed: {
    sessionIdIsInvalid(): boolean {
      return this.sessionId.length !== 8;
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    async openSession() {
      const isValid = await this.sessionExists();
      if (isValid) {
        this.$router.push({ name: 'session', params: { sessionId: this.sessionId } });
      }
      else {
        this.showWarning = true;
      }
    },
    sessionIsExpired(startTs: Date): boolean {
      const diff = Math.abs(startTs.getTime() - Date.now());
      console.log(diff)
      return diff > 1000 *  3600 * 2;
    },
    async sessionExists(): Promise<boolean> {
      try {
        const session = await getSession(this.sessionId);
        const expired = this.sessionIsExpired(new Date(session.startTs));
        console.log(expired);
        return !!session.sessionId && !expired;
      }
      catch {
        return false;
      }
    }
  }
})
</script>