<template>
<div>
  <div class="navi">
    <div>
      <input class="checkall" type="checkbox" @change="handleCheckAll">
      <button class="btn btn-primary" @click="addRule">
        <span class="glyphicon glyphicon-plus"></span>
        <span>Add Rule</span>
      </button>
      <button class="btn btn-default" @click="viewRules" title="Check rules to view"
        :disabled="!checkedRules.length">
        <span class="glyphicon glyphicon-save"></span>
        <span>View Rules</span>
      </button>
    </div>
    <div>
      <input type="search" class="form-control" placeholder="search" v-model="keyword" />
    </div>
  </div>

  <div class="rules">
    <div class="empty-tip" v-if="!rules.length">
      <div class="alert alert-info">No rules for now.</div>
    </div>
    <div class="empty-tip" v-if="rules.length && !filteredRules.length">
      <div class="alert alert-warning">No matched rules.</div>
    </div>
    <div v-else>
      <ul class="list-group">
        <li class="list-group-item" v-for="rule in filteredRules" :key="rule.id">
          <button class="btn btn-xs btn-danger pull-right" @click="removeRule(rule.id)">&times;</button>
          <input type="checkbox" :value="rule.id" v-model="checkedRules">
          <router-link :to="{
            name: 'Editor',
            params: {
              id: rule.id
            }
          }">{{ rule.name }}</router-link>
          <small class="text-muted" v-if="rule.updateTime" title="D/M/Y H:M:S"
            >{{ rule.updateTime | formatTime}}</small>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import {padStart} from 'lodash'
import {
  list as listRule,
  save as saveRule,
  remove as removeRule
} from '../lib/rule-storage'
import {getSampleRule} from '../lib/rules-generator'

export default {
  name: 'Rules',
  data () {
    return {
      keyword: '',
      rules: [],
      checkedRules: []
    }
  },
  computed: {
    filteredRules() {
      let keyword = this.keyword.trim()
      if (!keyword) {
        return this.rules
      }
      return this.rules.filter(function (rule) {
        return rule.name.indexOf(keyword) >= 0
      })
    },
    formattedRules() {
      let ids = this.checkedRules
      return formatRules(this.rules.filter(function (rule) {
        return ids.includes(rule.id)
      }))
    }
  },
  methods: {
    addRule() {
      let id = generateRuleId()
      saveRule({
        id,
        name: 'Untitled',
        content: getSampleRule()
      })
      this.$router.push({
        name: 'Editor',
        params: {
          id
        }
      })
    },
    viewRules() {
      this.$router.push({
        name: 'Viewer',
        params: {
          ids: this.checkedRules.join(',')
        }
      })
    },
    removeRule(id) {
      removeRule(id)
      this.rules = listRule()
    },
    handleCheckAll({currentTarget: target}) {
      if (target.checked) {
        this.checkedRules = this.filteredRules.map(rule => rule.id)
      }
      else {
        this.checkedRules = []
      }
    }
  },
  filters: {
    formatTime(val) {
      let date = new Date(val)
      return `${padStart(date.getDate(), 2, '0')}/${padStart(date.getMonth() + 1, 2, '0')}/${date.getFullYear()} ${padStart(date.getHours(), 2, '0')}:${padStart(date.getMinutes(), 2, '0')}`
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.rules = listRule()
    })
  }
}

function generateRuleId() {
  return (Math.floor(Math.random() * 1E6) + 1E6).toString(36).toUpperCase()
}
</script>

<style lang="less" scoped>
.navi {
  display: flex;
  justify-content: space-between;
}
.checkall {
  font-size: 1.2em;
  margin: 0 1em;
}
.rules {
  margin-top: 1.2em;
  font-size: 1.2em;

  input[type=checkbox] {
    margin-right: 1em;
  }

  small {
    margin-left: 1em;
  }
}

</style>
