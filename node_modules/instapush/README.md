## Instapush
### [Instapush](http://instapush.im) API client for Node.js

### Installation
```bash
npm install instapush
```

### Basic Use
```javascript
var instapush = require('instapush');
//authorize
instapush.settings({
    token: '5295f58f12e23cf5',
    id:'52eed96ea2a8f0f',
    secret:'9a96794fec44481de5',
});

instapush.request('GET','/apps/list' ,function (err, response){
    console.log(response);
});

```


### Helper Methods
The instapush module also includes methods that make working with common API resources a bit simpler:

<table width="100%">
    <tr>
        <th width="20%">Method</td>
        <th width="75%">Example</td>
        <th width="5%"></td>
    </tr>
     <tr>
        <td>notify</td>
        <td><pre lang="javascript"><code>instapush.notify(data,callback);</code></pre></td>
        <td><a href="https://instapush.im/developer/rest#send">Link</a></td>
    </tr>

    <tr>
        <td>listEvents</td>
        <td><pre lang="javascript"><code>instapush.listEvents(callback);</code></pre></td>
        <td><a href="https://instapush.im/developer/rest#listevents">Link</a></td>
    </tr>
    <tr>
        <td>listApps</td>
        <td><pre lang="javascript"><code>instapush.listApps(callback);</code></pre></td>
        <td><a href="http://instapush.im/developer/rest#listapps">Link</a></td>
    </tr>
    <tr>
        <td>addApp</td>
        <td><pre lang="javascript"><code>instapush.addApp(data,callback);</code></pre></td>
        <td><a href="http://instapush.im/developer/rest#addapp">Link</a></td>
    </tr>
    <tr>
        <td>addEvent</td>
        <td><pre lang="javascript"><code>instapush.addEvent(data, callback);</code></pre></td>
        <td><a href="http://instapush.im/developer/rest#stats">Link</a></td>
    </tr>
</table>

### Full Use
```javascript

var instapush = require('instapush');
//authorize
instapush.settings({
    ssl : true,
    token:'5295f58e23cf5',
    id:'52a221ab1284567',
    secret:'ad50d9eda8fdbc4b9a6',
});

//send a push notification triggered with the search event
instapush.notify({"event":"search","trackers":{"term":"api"}} ,function (err, response){
    console.log(response);
});

//list all events for the app, using the id and secret
instapush.listEvents(function (err, response){
    console.log(response);
});
//list all apps for a user using user token
instapush.listApps(function (err, response){
    console.log(response);
});


//adding a new event to an application
data = {"title":"nodejsEvent2",
        "trackers":["name","country"],
        "message":"{name} from {country} sucked."
        };
instapush.addEvent(data,function (err, response){
    console.log(response);
});

instapush.addApp({"title":"NodeJSAPP"},function (err, response){
    console.log(response);
});
```