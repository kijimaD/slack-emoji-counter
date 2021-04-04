

![image](https://user-images.githubusercontent.com/11595790/113496072-f1a4a480-9530-11eb-9051-bc7536e80217.png)

## Overview
[![](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVERcbiAgICBBW1NsYWNrXSAtLT58Q29udmVyc2F0aW9uIEFQSXwgQihHb29nbGUgU3ByZWFkIFNoZWV0KVxuICAgIENbR29vZ2xlIFNwcmVhZCBTaGVldF0gLS0-fEFnZ3JlZ2F0ZXwgRFtTbGFja10iLCJtZXJtYWlkIjp7fSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVERcbiAgICBBW1NsYWNrXSAtLT58Q29udmVyc2F0aW9uIEFQSXwgQihHb29nbGUgU3ByZWFkIFNoZWV0KVxuICAgIENbR29vZ2xlIFNwcmVhZCBTaGVldF0gLS0-fEFnZ3JlZ2F0ZXwgRFtTbGFja10iLCJtZXJtYWlkIjp7fSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)
## required scope

![Screenshot_2021-04-04_15-58-10 (1)](https://user-images.githubusercontent.com/11595790/113501998-3b5ab280-9564-11eb-841b-542870c79719.png)

## Auth test
```bash
curl -X POST -H "Authorization: Bearer token0000000" "https://slack.com/api/conversations.history?channel=channel0000000"
```
[conversations\.history method \| Slack](https://api.slack.com/methods/conversations.history/test)

## Set GAS Property
Set your `token` and `channel_id` and to run. New GAS visual editor not support to set property.
```js
function setProperty() {
  PropertiesService.getScriptProperties().setProperty("SLACK_TOKEN","xxxx-0000-...");
  PropertiesService.getScriptProperties().setProperty("CHANNEL_ID","ABC...");
}
```

## Reference
Original code referenced site: https://zenn.dev/barusu/articles/0454005fc556dd

(This code doesn't work as channels.history API was deprecated.)
