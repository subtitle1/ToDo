// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    loaderColor: string;
    accentColor: string;
    cntTextColor: string;
    tabBgColor: string;
  }
}
