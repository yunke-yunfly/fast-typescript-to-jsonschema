// import { Get, JsonController, Body, QueryParam,BodyParam, Post, HeaderParam, CookieParam } from "routing-controllers";
// import { Inject } from "typedi";
// import getApolloConfig from "@yunke/apollo";

export interface BodyPar {
  name: string;
  age: number;
}

@JsonController('/test')
export default class TestController {

  /**
   * 注释
   *
   * @param {BodyPar} user
   * @param {string} token
   * @param {string} username
   * @param {string} name
   * @param {string} [age]
   * @return {*}  {Promise<BodyPar>}
   * @memberof TestController
   */
  @Post('/jest')
  async jest(
    @Body() user: BodyPar,
    @HeaderParam('authorization') token: string,
    @CookieParam('username') username: string,
    @BodyParam('name', { required: true }) name: string,
    @BodyParam('age') age?: string,
  ): Promise<BodyPar> {
    return user || name || 'success';
  }
}
