# Guide to Setup up mock data in MongoDB

For windows you can also follow [this video guide](https://www.youtube.com/watch?v=FwMwO8pXfq0) to set up MongoDB

For mac you can also follow [this video guide](https://www.youtube.com/watch?v=MIByvzueqHQ) to set up MongoDB

1. **Download MongoDB-community server, MongoDB toolkit & MongoDB-Compass.**

   - [MongoDB Community server](https://www.mongodb.com/try/download/community)
   - [MongoDB toolkit](https://www.mongodb.com/try/download/database-tools)
   - [MongoDB Compass](https://www.mongodb.com/try/download/compass) _(Optional)_

2. **Set up [Path Enviroment Variables](https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/) for mongo and mongo-toolkit.**

   _Default directory location of mongo-server & mongo-tools_

   `C:\Program Files\MongoDB\Server\5.0\bin`

   `C:\Program Files\MongoDB\Tools\100\bin`

   To check if path variables are correctly setup, run

   ```sh
   mongo
   ```

   ```sh
   mongorestore
   ```

   If you get `command not found`, the path variables are not setup correctly, (**try restarting once before doing any further debugging after checking the path variables are correctly set.**)

3. **Restore database from dump files**

   ```
   mongorestore --db {db-name} {dump_file_location}
   ```

   ```
   mongorestore --db Vita ./mock-data/dump
   ```

---
