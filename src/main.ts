import diaryMove from '@/diary';
import userMove from '@/user';

import discovery_history from './discovery_history';
import mind_test_history from './mind_test_history';
import user_notification from './user_notification';

async function main() {
    const testCase = 6 as number;
    switch (testCase) {
        case 1:
            diaryMove();
            break;
        case 2:
            userMove();
            break;
        case 3:
            discovery_history();
            break;

        case 4:
            mind_test_history();
            break;
        case 5:
            user_notification();
            break;
        default:
            break;
    }
}

main();
