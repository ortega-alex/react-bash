import { createSlice } from '@reduxjs/toolkit';
import { clearStorage, getStorage, saveStorage, _KEYS } from '@/services';

const EmptySessionState = null;
const session = getStorage(_KEYS.SESSION);
export const sessionSlice = createSlice({
    name: 'session',
    initialState: session ? session : EmptySessionState,
    reducers: {
        setSession: (state, action) => {
            const { session, token } = action.payload;
            if (token) saveStorage(_KEYS.TOKEN, token);
            saveStorage(_KEYS.SESSION, session);
            return session;
        },
        modifySession: (state, action) => ({ ...state, ...action.payload }),
        resetSession: () => {
            clearStorage(_KEYS.SESSION);
            clearStorage(_KEYS.TOKEN);
            return EmptySessionState;
        }
    }
});

export const { setSession, modifySession, resetSession } = sessionSlice.actions;
export default sessionSlice.reducer;
