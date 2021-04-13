[![eslint](https://github.com/kijimaD/slack-emoji-counter/actions/workflows/lint.yml/badge.svg)](https://github.com/kijimaD/slack-emoji-counter/actions/workflows/lint.yml)

⭐Spread Sheet interface slack emoji counter.

↓ `Run`

![9UZuWyFyNQE9Z821618131717_1618131792 (1)](https://user-images.githubusercontent.com/11595790/114298576-06190c00-9af2-11eb-902f-208a08b3c259.png)

↓ `Record`

![Screenshot_2021-04-11_18-23-48](https://user-images.githubusercontent.com/11595790/114299004-116d3700-9af4-11eb-801e-4594ef806980.jpg)

↓ `Post(Example: Top 3)`

![resized-image-Promo](https://user-images.githubusercontent.com/11595790/114580944-42976400-9cba-11eb-8c58-7b4bed7d5cca.jpeg)

## 👀Overview
[![](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVERcbiAgICBBW1NsYWNrXSAtLT58Q29udmVyc2F0aW9uIEFQSXwgQihHb29nbGUgU3ByZWFkIFNoZWV0KVxuICAgIENbR29vZ2xlIFNwcmVhZCBTaGVldF0gLS0-fFBvc3R8IERbU2xhY2tdIiwibWVybWFpZCI6e30sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVERcbiAgICBBW1NsYWNrXSAtLT58Q29udmVyc2F0aW9uIEFQSXwgQihHb29nbGUgU3ByZWFkIFNoZWV0KVxuICAgIENbR29vZ2xlIFNwcmVhZCBTaGVldF0gLS0-fFBvc3R8IERbU2xhY2tdIiwibWVybWFpZCI6e30sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)

0. (Set [Reacji Channeler](https://reacji-channeler.builtbyslack.com/))
0. Get Slack token(enable conversation scope)
1. Set GAS properties(`SLACK_TOKEN`, `POST_URL`(post_url can fill dummy))
2. Run `init()` - initialize option/save sheet
3. Fill your slack channel_id in option sheet 
4. Run `loadToSheet()`: load channel conversation data. You can specify the condition by filling sheet!
5. (testing) latestMonthAndPost() ... loadToSheet() + post top-3 reaction count comment 

## 🔑Required Slack token scope

![Screenshot_2021-04-04_15-58-10 (1)](https://user-images.githubusercontent.com/11595790/113501998-3b5ab280-9564-11eb-841b-542870c79719.png)

- channels:history

## Set GAS Properties
Set your `SLACK_TOKEN` and `POST_URL` and to run. New GAS visual editor not support to set property.
```js
function setProperty() {
  PropertiesService.getScriptProperties().setProperty("SLACK_TOKEN","xxxx-0000-...");
  PropertiesService.getScriptProperties().setProperty("POST_URL","https://...");
}
```

## ✋Auth test
```bash
curl -X POST -H "Authorization: Bearer token0000000" "https://slack.com/api/conversations.history?channel=channel0000000"
```
[conversations\.history method \| Slack](https://api.slack.com/methods/conversations.history/test)

## 📖Reference
Original code referenced site: https://zenn.dev/barusu/articles/0454005fc556dd

(This code doesn't work as channels.history API was deprecated.)
