
import {pick, find, findIndex} from 'lodash'

const storeKeyPrefix = 'pkerm'
const storeKeyName = 'rules'

function getStoreKey(name) {
  if (!name) {
    throw new Error('Name is required')
  }
  return `${storeKeyPrefix}_${name}`;
}

function getRules() {
  let rules = localStorage.getItem(getStoreKey(storeKeyName))
  try {
    return JSON.parse(rules) || []
  }
  catch (err) {
    console.log('Can not get saved rules')
    return []
  }
}

function setRules(rules) {
  return localStorage.setItem(getStoreKey(storeKeyName), JSON.stringify(rules))
}

export function list() {
  return getRules().map(function (rule) {
    return pick(rule, ['id', 'name', 'updateTime'])
  })
}

export function read(id) {
  if (Array.isArray(id)) {
    return getRules().filter(function (rule) {
      return id.includes(rule.id)
    })
  }
  return find(getRules(), function (rule) {
    return rule.id === id;
  })
}

export function save(rule) {
  let rules = getRules()
  let ruleIndex = findIndex(rules, function (item) {
    return item.id === rule.id
  })
  if (ruleIndex >= 0) {
    rules[ruleIndex] = rule
  }
  else {
    rules.push(rule)
  }
  return setRules(rules)
}

export function remove(id) {
  let rules = getRules()
  let ruleIndex = findIndex(rules, function (item) {
    return item.id === id
  })
  if (ruleIndex >= 0) {
    rules.splice(ruleIndex, 1)
    return setRules(rules)
  }
  return 0
}
