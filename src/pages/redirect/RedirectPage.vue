<template>
  <div id="page-redirect">
    <h5 class="q-my-md text-center">{{ $t('redirect.title') }}</h5>
    <q-form ref="form" class="row q-col-gutter-sm">
      <div class="col"></div>
      <div class="col col-auto" style="width: 60%">
        <q-spinner class="full-width" color="primary" size="100%"></q-spinner>
      </div>
      <div class="col"></div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'RedirectPage',
  setup () {
    const router = useRouter();
    if (process.env.CLIENT) {
      setTimeout(() => {
        router.push('/home')
      }, 1000)
    }
  }
});
</script>
