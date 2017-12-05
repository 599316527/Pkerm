<template>
<div class="editor">
  <h2>Edit Rule</h2>

  <form @submit.prevent="handleFormSubmit">
    <div class="form-group">
      <label>Name</label>
      <input class="form-control" type="text" v-model="name" required>
    </div>
    <div class="form-group">
      <label>Rule</label>
      <textarea class="form-control" v-model="content" ref="content"></textarea>
    </div>
    <button type="submit" class="btn btn-default">Save</button>
  </form>

</div>
</template>

<script>
import {pick} from 'lodash'
import {
  read as readRule,
  save as saveRule
} from '../lib/rule-storage'

const ruleKeys = ['id', 'name', 'content']

const codeMirrorConfig = {
  lineNumbers: true,
  mode: {
    name: "javascript",
    json: true
  },
  gutters: ["CodeMirror-lint-markers"],
  lint: true
}

export default {
  name: 'Editor',
  data () {
    return ruleKeys.reduce(function (obj, key) {
      obj[key] = ''
      return obj
    }, {})
  },
  methods: {
    handleFormSubmit() {
      this.content = this.$refs.content.value
      saveRule(Object.assign({
        'updateTime': Date.now()
      }, pick(this, ruleKeys)))
    }
  },
  mounted() {
    let codeMirror = CodeMirror.fromTextArea(this.$refs.content, codeMirrorConfig)
    codeMirror.setValue(formatJson(this.content))
    codeMirror.on('blur', () => {
      codeMirror.save()
    })
    this.codeMirror = codeMirror

    let scopedLabel = Object.keys(this.$refs.content.dataset).filter(function (key) {
      return key.startsWith('v')
    })[0]
    if (scopedLabel) {
      codeMirror.getWrapperElement().dataset[scopedLabel] = true
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
    let rule = readRule(to.params.id)
    if (!rule) {
      vm.$router.replace({
        name: 'Error',
        params: {
          code: 404
        }
      })
    }
    Object.assign(vm, pick(rule, ruleKeys))
    if (vm.codeMirror) {
      vm.codeMirror.setValue(formatJson(vm.content))
    }
  }
}

function formatJson(jsonStr) {
  try {
    return JSON.stringify(JSON.parse(jsonStr), null, 4)
  }
  catch (err) {
    return jsonStr
  }
}
</script>

<style lang="less" scoped>
form {
  margin-top: 2em;
}
.CodeMirror {
  border: 1px solid #ccc;
  border-radius: 4px;
  height: auto;
}
</style>
