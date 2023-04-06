import axios, { AxiosError } from 'axios';
import { ChromeDebuggerResponse } from '~/types';
import { randomInt } from '~/utils/general';

export const getChromeDebuggerUrl = async (port: string | number): Promise<string> => {
  if (isNaN(Number(port))) {
    throw new Error(`Invalid port ${port}`);
  }

  const res = await axios.get(`http://127.0.0.1:${port}/json/version`);
  const debuggerData = res.data as Partial<ChromeDebuggerResponse>;
  const webSocketDebuggerUrl = debuggerData.webSocketDebuggerUrl;

  if (!webSocketDebuggerUrl) {
    throw new Error('Could not get webSocketDebuggerUrl');
  }

  return webSocketDebuggerUrl;
};

export const pickRandomDebuggingPort = async (): Promise<number> => {
  const port = randomInt(9222, 9322);
  try {
    await getChromeDebuggerUrl(port);
    return await pickRandomDebuggingPort();
  } catch (error) {
    if (error instanceof AxiosError && error.code === 'ECONNREFUSED') {
      return port;
    } else {
      throw error;
    }
  }
};
