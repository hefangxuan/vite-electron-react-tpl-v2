import { useRequest, useSetState } from 'ahooks';
import {
  createOrUpdateSign,
  createOrUpdateSynonym,
  delSynonym,
  findSignList,
  findSynonymList,
} from '../../apis/wz_nest';
import { useCallback } from 'react';
import { message } from 'antd';

interface SelectState {
  signId: number;
}

export default function useSynonymHook() {
  const [selectState, setSelectState] = useSetState<SelectState>({
    signId: 0,
  });

  // 获取同义词模板列表
  const findSignListFn = useRequest(findSignList, {
    formatResult: (res: any) => {
      console.log(res);
      return res?.data || [];
    },
  });

  // 创建或更新同义词模板
  const createOrUpdateSignFn = useRequest(createOrUpdateSign, {
    manual: true,
    formatResult: (res: any) => {
      if (res?.code === 1) {
        findSignListFn.run().then();
        message.success(res?.message).then();
      } else {
        message.info(res?.errorMessage).then();
      }

      return res;
    },
  });

  // 获取同义词列表
  const findSynonymListFn = useRequest(findSynonymList, {
    manual: true,
    formatResult: (res: any) => {
      console.log(res);
      return res?.data || [];
    },
  });

  // 创建或更新同义词
  const createOrUpdateSynonymFn = useRequest(createOrUpdateSynonym, {
    manual: true,
    formatResult: (res: any) => {
      if (res?.code === 1) {
        findSynonymListFn.run({ ySignId: selectState.signId }).then();
        message.success(res?.message).then();
      } else {
        message.info(res?.errorMessage).then();
      }

      return res;
    },
  });

  // 删除同义词
  const delSynonymFn = useRequest(delSynonym, {
    manual: true,
    formatResult: (res: any) => {
      if (res?.code === 1) {
        findSynonymListFn.run({ ySignId: selectState.signId }).then();
        message.success(res?.message).then();
      } else {
        message.info(res?.errorMessage).then();
      }

      return res;
    },
  });

  // 选择模板类型时触发
  const signSelectFn = useCallback((id: number) => {
    setSelectState({ signId: id });
    findSynonymListFn.run({ ySignId: id }).then();
  }, []);

  return {
    findSignListFn,
    selectState,
    signSelectFn,
    createOrUpdateSignFn,
    findSynonymListFn,
    createOrUpdateSynonymFn,
    delSynonymFn,
  };
}
