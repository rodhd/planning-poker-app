<template>
  <div class="flex items-center justify-center h-screen">
    <div>
      <button 
        class="py-4 px-2 bg-red-300 border-gray-700 shadow rounded"
        @click="createSession">
          Create New Session
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { createSession } from '@/api/sessions';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
})
export default class HomeView extends Vue {
  sessionId: string | null = null;

  async createSession() {
    const session = await createSession();
    this.$router.push({ name: 'session', params: { sessionId: session.sessionId } });
  }
}
</script>
