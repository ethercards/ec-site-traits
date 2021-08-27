# ec-site-traits

Jekyll Project

To run locally
```
jekyll build --watch
cd _site
py -m http.server
```
or 
```
bundle exec jekyll serve
```

To get traits in json format
```
jekyll build
copy generated traits-json.html and rename file type to traits-json.json
```

To deploy to burneth staging
```
jekyll build
copy the generated contents in _site into docs folder
push to staging
```