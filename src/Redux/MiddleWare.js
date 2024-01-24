import { takeLatest, takeEvery, call, delay, put } from 'redux-saga/effects'

//Call API
const getUserSv1 = async () => {
    const res = await fetch("")

    if (res.status === 200) {
        let data = await res.json()
        return data;
    }
    else {
        return null;
    }
}

// Tạo Function GetData để lấy dữ liệu từ server
function* GetData() {
    yield delay(1000);
    yield put({ type: "CHANGE_STATUS", payload: { status: "Đang lấy data từ server xuống ..." } })
    const data = yield call(getUserSv1)
    if (data) {
        yield put({ type: "SET_DATA", payload: { userLs: data } })
    }
}

function* mySaga() {
    yield takeLatest("GET_DATA", GetData)
    yield takeLatest("GET_DATA", GetData)
}

export default mySaga;

