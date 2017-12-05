
import {read as readRules} from './rule-storage'
import sampleRule from './sample-rule'

export function wrapRules(ids) {
  return {
    title: "My PKERM rules",
    rules: readRules(ids).map(function (rule) {
      let content
      try {
        content = JSON.parse(rule.content)
      }
      catch(err) {
        console.log(`Can not parse config for ${rule.name}(${rule.id}). Skipped`)
        return null
      }
      if (!content.description) {
        content.description = rule.name
      }
      return content
    }).filter(function (rule) {
      return rule
    })
  }
}

export function formatRules(ids) {
  return JSON.stringify(wrapRules(ids), null, 4)
}

export function getSampleRule() {
  return JSON.stringify(sampleRule, null, 4)
}
