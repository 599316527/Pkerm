<template>
<div class="viewer">
  <h2>View Rules</h2>
  <div class="controls">
    <a class="btn btn-link" @click="exportRules">
      <span class="glyphicon glyphicon-share"></span>
      <span>Export to Karabiner Elements</span>
    </a>
  </div>
  <div class="rules">
    <pre>{{ formattedRules }}</pre>
  </div>
</div>
</template>

<script>
import {formatRules} from '../lib/rules-generator'

const exportUrlPrefix = 'karabiner://karabiner/assets/complex_modifications/import?url='

export default {
  name: 'Viewer',
  props: {

  },
  data () {
    return {
      ids: []
    }
  },
  computed: {
    formattedRules() {
      return formatRules(this.ids)
    }
  },
  methods: {
    exportRules({currentTarget: target}) {
      let url = 'data:text/json;base64,' + btoa(this.formattedRules)
      target.href = exportUrlPrefix + encodeURIComponent(url)
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      getRouterHandle(vm)(to, from)
    })
  },
  beforeRouteUpdate(to, from, next) {
    getRouterHandle(this)(to, from)
    next()
  }
}

function getRouterHandle(vm) {
  return function (to, from, next) {
    vm.ids = (to.params.ids || '').split(',')
  }
}
</script>

<style lang="less" scoped>
.controls {
  text-align: right;
}
.rules {
  margin-top: 1em;
}
</style>
