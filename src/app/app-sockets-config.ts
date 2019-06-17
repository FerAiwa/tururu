import { SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

export const socketConfig: SocketIoConfig = {
  url: `${environment.apiBaseUrl}`, options: {
    transportOptions: {
      polling: {
        extraHeaders: {
          authorization: JSON.parse(localStorage.getItem('auth')) && "Bearer " + JSON.parse(localStorage.getItem('auth')).accessToken,
        },
      }
    }
  }
}
