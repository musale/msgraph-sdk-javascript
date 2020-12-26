/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/**
 * @class
 * Class representing MiddlewareControl
 */
export class MiddlewareControl {
	/**
	 * @public
	 * @constructor
	 * Creates an instance of MiddlewareControl
	 * @param {MiddlewareOptions[]} [middlewareOptions = []] - The array of middlewareOptions
	 * @returns The instance of MiddlewareControl
	 */
	constructor(middlewareOptions = []) {
		// tslint:disable-next-line:ban-types
		this.middlewareOptions = new Map();
		for (const option of middlewareOptions) {
			const fn = option.constructor;
			this.middlewareOptions.set(fn, option);
		}
	}
	/**
	 * @public
	 * To get the middleware option using the class of the option
	 * @param {Function} fn - The class of the strongly typed option class
	 * @returns The middleware option
	 * @example
	 * // if you wanted to return the middleware option associated with this class (MiddlewareControl)
	 * // call this function like this:
	 * getMiddlewareOptions(MiddlewareControl)
	 */
	// tslint:disable-next-line:ban-types
	getMiddlewareOptions(fn) {
		return this.middlewareOptions.get(fn);
	}
	/**
	 * @public
	 * To set the middleware options using the class of the option
	 * @param {Function} fn - The class of the strongly typed option class
	 * @param {MiddlewareOptions} option - The strongly typed middleware option
	 * @returns nothing
	 */
	// tslint:disable-next-line:ban-types
	setMiddlewareOptions(fn, option) {
		this.middlewareOptions.set(fn, option);
	}
}
//# sourceMappingURL=MiddlewareControl.js.map
