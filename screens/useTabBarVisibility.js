import { useLayoutEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const useTabBarVisibility = (visible) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // 현재 화면이 포커스된 상태인지 확인

  useLayoutEffect(() => {
    const parentNavigator = navigation.getParent();
    if (parentNavigator && isFocused) { // 화면이 포커스된 경우에만 탭 바 스타일 변경
      parentNavigator.setOptions({
        tabBarStyle: visible
          ? {
              position: "absolute",
              height: 50,
            }
          : { display: "none" },
      });
    }

    // 화면이 포커스를 잃었을 때 탭 바 가시성 복원
    return () => {
      if (parentNavigator && !isFocused) {
        parentNavigator.setOptions({
          tabBarStyle: {
            position: "absolute",
            height: 50,

          },
        });
      }
    };
  }, [navigation, visible, isFocused]);
};

export default useTabBarVisibility;
