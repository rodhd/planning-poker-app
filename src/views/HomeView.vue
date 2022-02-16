<template>
  <div class="flex items-center justify-center h-screen">
    <div class="py-3 px-6 bg-blue-100 rounded shadow-md">
      <h1 class="text-2xl font-semibold">Planing Poker App</h1>
      <p>Create or join a new session</p>
      <div class="flex flex-row mt-3">
        <button
          class="
            py-4 
            px-2 
            mr-2 
            bg-green-500 
            border-gray-700 
            text-white
            font-semibold
            min-w-fit 
            w-1/2 
            shadow 
            rounded
            hover:bg-green-300"
          @click="createSession">
            New Session
        </button>
        <button
          class="
            py-4 
            px-2 
            bg-gray-500 
            border-gray-700
            text-white
            font-semibold
            min-w-fit 
            w-1/2 
            shadow 
            rounded
            hover:bg-gray-300"
          @click="toggleModal">
            Join Session
        </button>
      </div>
      <JoinSessionModal :isActive="modalToggled" @closeModal="toggleModal"/>
    </div>
  </div>
</template>

<script lang="ts">
import { createSession } from '@/api/sessions';
import { Options, Vue } from 'vue-class-component';
import JoinSessionModal from '@/components/home/JoinSessionModal.vue';

@Options({
  components: {
    JoinSessionModal
  },
})
export default class HomeView extends Vue {
  sessionId: string | null = null;
  modalToggled = false;

  async createSession() {
    const session = await createSession();
    this.$router.push({ name: 'session', params: { sessionId: session.sessionId } });
  }

  toggleModal() {
    this.modalToggled = !this.modalToggled;
  }
}
</script>
