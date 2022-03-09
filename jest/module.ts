import { AAA as _AAA } from './common';
import { ExportAll } from './module_type_export_all';
import {
  GroupExport,
  User as _User,
  GroupDefaultExport,
  nameSpaceExport,
} from './module_type_export_group';

import DefaultExport from './module_types_1';

interface Module_0 {
  attr: _AAA;
}

interface Module_1 {
  attr1: _AAA;
  attr2: _User;
}

interface Module_2 {
  attr: ExportAll;
}

interface Module_3 {
  attr: GroupExport;
}

interface Module_4 {
  attr: GroupDefaultExport;
}

interface Module_5 {
  attr: nameSpaceExport.User;
}

interface Module_6 {
  attr: DefaultExport;
}
