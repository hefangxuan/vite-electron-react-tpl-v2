
## List

Demo:

```tsx
import React from 'react';
import { List } from '@hefx/cmp';

export default () => {
  const getList = () => {
    let arr = [];

    for (var i = 0; i < 50; i++) {
      arr.push({
        id: i+1,
        title: `这里是标题 ${i+1}`
      })
    }
    return arr
  }
  const renderDOM = (item: any) => {
    return (
      <div className='p-10' key={item.id}>{item.title}</div>
    )
  }
  return (
    <div style={{width: 300, height: 300, overflow: 'hidden'}} className='border-d'>
      <List dataSource={getList()} renderItem={renderDOM}/>
    </div>
  )
};
```
Demo:

```tsx
import React from 'react';
import { List } from '@hefx/cmp';

export default () => {
  const getList = () => {
    let arr = [];

    for (var i = 0; i < 50; i++) {
      arr.push({
        id: i+1,
        title: `这里是标题 ${i+1}`
      })
    }
    return arr
  }
  const renderDOM = (item: any) => {
    return (
      <div className='p-10' key={item.id}>{item.title}</div>
    )
  }
  return (
    <div style={{width: 300, height: 300, overflow: 'hidden'}} className='border-d'>
      <List searchConfig={{
        searchKeys: ['title']
      }} dataSource={getList()} renderItem={renderDOM}/>
    </div>
  )
};
```


<API></API>
