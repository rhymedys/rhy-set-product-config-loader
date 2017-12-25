# set-product-config-loader
set AppConfig to default state when in the production development

##  Example

```javascript
export const isDebugApi = true // development environment state
      ↓ ↓ ↓ ↓
export const isDebugApi = false // production environment state
```

```javascript
export const isDebugLog = true // development environment state
      ↓ ↓ ↓ ↓
export const isDebugLog = false  // production environment state
```

## Usage
### Install
```cmd
npm i set-product-config-loader
```
### Config
add as webpack loader in webpack config file
```Javascript
{
  test: /\.js$/,
  loader: 'set-product-config-loader',
  include: [resolve('src')],
  options: {
    fileName:AppConfig, // default value is AppConfig
    configs: ['isDebugApi', 'isDebugLog'] // the key to set default value 'false' or you can set defined value by this way ——configs: [{isDebugApi:false}]
    }
}
```
