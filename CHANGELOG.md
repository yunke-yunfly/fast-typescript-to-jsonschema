## 0.0.8 (2023-02-27)


### Bug Fixes

* 避免原有definitions被覆盖 ([64d2ff6](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/64d2ff626dbb0b33593b6e0c890a8d1026c155a0))
* 泛型默认值，进行深度克隆，避免被覆盖 ([ffb5d2d](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/ffb5d2d2ebe606733fb8031c5b4018eccca67a71))
* 完善重复引用逻辑 ([136e9b0](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/136e9b037acb5c4cc3b47f080c3ee61c5e6880b8))
* 完善重复引用逻辑 ([eed579e](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/eed579e5f18977e35fc0ad8c5ab9f48bad7f4f16))
* 重复引用以及 namespace 多层嵌套解析 ([a08d8d9](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/a08d8d9e8aacef1a5995a23ebaa83dc86c66d415))
* genJsonschema 方法 entry 增加默认值处理 ([cde668a](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/cde668a66e53f69166943fbde95e1abe37176ffe))
* namespace 多层嵌套解析问题 ([78b7b27](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/78b7b277165ada3bef60af4417b563a169f374cc))


### Features

* 1. 新增对npm包类型的支持 2.修复非同类型枚举类型结果不准确问题 3.修复枚举类型中key为字符串时深度循环问题 ([1e9bbad](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/1e9bbadb1635df39e41240978f80e8ccb2e01b06))
* 1. 新增通过 code 生成 jsonschema ([96770e3](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/96770e327ad65d8f6e9e0a79182eea946a6bdef5))
* 更新文档,新增测试案例 ([84a5788](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/84a5788d9b3593d3df6bd1a011f7590a8fec1794))
* 更新文档,新增测试案例 ([c480e6c](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/c480e6cf2e31b2a12bc9101f11cc0171a47f50c8))
* 解析块级文档支持description参数 ([176adcb](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/176adcb6fe3e23772f4228cf4a628c49e2489cca))
* 枚举类型解析问题 ([6467bae](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/6467bae084d9b237c1be516d12b8f6938eecaf83))
* 默认文档切换为英文文档 ([df98316](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/df98316506277468909d8c44b2f8473db3cab13c))
* 删除额外属性,处理type为数组情况，完善逻辑 ([265ad1e](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/265ad1e029d96c5ae16257e35e5f68bf54aca6d1))
* 完善additionalProperties处理，补充测试用例 ([1e3fe87](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/1e3fe873462b927eb500f6e74ae47dac8c32a67e))
* 文档优化 ([3591789](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/359178929e255e6f9bef2b9989acc3ecdc1275fb))
* 新增测试覆盖率标识 ([c94dca2](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/c94dca2ed57ed2692d714dfa4bc8d9b403e18e6c))
* 新增测试覆盖率标识 ([56daa19](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/56daa19e2deffb8c1f95d6097e104a6d6efbc971))
* 新增测试覆盖率标识 ([96b1a17](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/96b1a17682b5bfda68c88301ced8096a520b987c))
* 新增测试覆盖率标识 ([1ad1c11](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/1ad1c112d5391319828a553cbf82600526804958))
* 新增测试覆盖率标识 ([4fb6beb](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/4fb6bebe1f6af10c56bb6f4169ca3f900f11b7d9))
* 新增测试覆盖率标识 ([cca0f42](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/cca0f420d53507ff4e52302e2a8471401e3f88e4))
* 修复包名 ([0813a33](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/0813a33085589e0aeb547836fbde371785409aca))
* 修复repository链接 ([24eea13](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/24eea136c8b58ef9148b00cf0adf0b8507496ea5))
* 增加本文件查找引用类型，删除枚举类型时的空definitions ([a7fc272](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/a7fc2721988e50a653e2cfa12f09c10cde4cb59d))
* 增加Partial、Required对联合类型的处理 ([a1c661b](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/a1c661b62b0f5f78136abc5eb4a41ef035df3207))
* 增加Pick/Omit对type的支持 ([46f2a9e](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/46f2a9e220eff2fb2afdc2b6b65fd5371ec2205c))
* 支持工具函数Partial ([fbe9c68](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/fbe9c682d9fb8e24a4e2fd3f05f2420c1c898d43))
* 支持工具函数Required ([486e1ea](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/486e1eaaf0cd9c691eebbd2de1c72252af6203a4))
* add codecov_token ([954b209](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/954b209c3315e88aab95bd8b7678db445e1d5de0))
* add codecov_token ([900ffda](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/900ffda089a792691b6b6a5c9b544172117c0e8e))
* add codecov_token ([22b7069](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/22b7069acb674185bf0994ce8e680b3ad786d134))
* add English docs ([0926ac6](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/0926ac62a84ac035a1569efdfebc61d66c673ca8))
* add license ([1f3fce9](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/1f3fce925597fa8f93acf4b5f89a15b7139fe87f))
* enable sourcemap ([882be37](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/882be37152ff71296c007fe4a1ed6f65c4c3f0c6))
* typescript-to-jsonschema first version ([15632cc](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/commit/15632cce735e96b037c9b01b64abce6056bcf4f2))



