// Components
import { Notification } from '@components/ui/notification';
// Utils
import { responseErrorStatusHandler } from './responseErrorStatusHandler';

export const errorHandler = (response: Response) => {
    const message = responseErrorStatusHandler(response);
    new Notification({
        content: message || 'Произошла ошибка, попробуйте еще раз',
        view: 'error',
    }).renderDOMElement('#notification-root');
};
