import {app, PORT} from './app';
import { devLog } from './src/utils/devlog';

app.listen(PORT, () => {
    devLog("Development Mode server is running on http://localhost:" + PORT);
});
