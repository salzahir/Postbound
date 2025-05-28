import {app} from './app';
import { devLog } from './src/utils/devlog';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    devLog("Server is running here: http://localhost:" + PORT);
});
