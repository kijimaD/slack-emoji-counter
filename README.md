https://zenn.dev/barusu/articles/0454005fc556dd さんのスクリプトが元になっています。

![image](https://user-images.githubusercontent.com/11595790/113496072-f1a4a480-9530-11eb-9051-bc7536e80217.png)


## required scope
![image](https://user-images.githubusercontent.com/11595790/113495926-d5543800-952f-11eb-9437-91f743519c83.png)

## Auth test
```bash
curl -X POST -H "Authorization: Bearer token0000000" "https://slack.com/api/conversations.history?channel=channel0000000"
```
[conversations\.history method \| Slack](https://api.slack.com/methods/conversations.history/test)

## Set GAS Property
Set your `token` and `channel_id` to `init.js`. And run `init.js`.
