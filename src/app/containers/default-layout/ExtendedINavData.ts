import {INavData} from "@coreui/angular";

export interface ExtendedINavData extends INavData {
  isAdminRequired?: boolean;
  isNonAdminRequired?: boolean;
}
