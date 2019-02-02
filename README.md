## Setup
To make project as easy at it can be to setup I decided to automate as much as possible, just type 
 ````````  npm run docker```````` and all the magic will be done auto-magicly! :)
    
##### Additional commands

- start tests
```npm run test```

- start static code analyze ```npm run lint```

- generate migration file ```npm run migration:create```

##### Additional information's
Application start and migration is delayed for purpose. Database needs some time to get on. 
Grab a cup of coffee and enjoy the show :)

By default project uses MySQL, but feel free to change it to whatever you want :)

You can override config files values by env variables! For more information read 
```https://www.npmjs.com/package/nconf```

To manipulate migration connection to database edit ```ormconfig.json```


Author:
```luksmialowski@gmail.com```