/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import * as tslib_1 from "tslib";
/**
 * @module GraphErrorHandler
 */
import { GraphError } from "./GraphError";
/**
 * @class
 * Class for GraphErrorHandler
 */
export class GraphErrorHandler {
	/**
	 * @private
	 * @static
	 * Populates the GraphError instance with Error instance values
	 * @param {Error} error - The error returned by graph service or some native error
	 * @param {number} [statusCode] - The status code of the response
	 * @returns The GraphError instance
	 */
	static constructError(error, statusCode) {
		const gError = new GraphError(statusCode, "", error);
		if (error.name !== undefined) {
			gError.code = error.name;
		}
		gError.body = error.toString();
		gError.date = new Date();
		return gError;
	}
	/**
	 * @private
	 * @static
	 * @async
	 * Populates the GraphError instance from the Error returned by graph service
	 * @param {any} error - The error returned by graph service or some native error
	 * @param {number} statusCode - The status code of the response
	 * @returns A promise that resolves to GraphError instance
	 *
	 * Example error for https://graph.microsoft.com/v1.0/me/events?$top=3&$search=foo
	 * {
	 *      "error": {
	 *          "code": "SearchEvents",
	 *          "message": "The parameter $search is not currently supported on the Events resource.",
	 *          "innerError": {
	 *              "request-id": "b31c83fd-944c-4663-aa50-5d9ceb367e19",
	 *              "date": "2016-11-17T18:37:45"
	 *          }
	 *      }
	 *  }
	 */
	static constructErrorFromResponse(error, statusCode) {
		error = error.error;
		const gError = new GraphError(statusCode, error.message);
		gError.code = error.code;
		if (error.innerError !== undefined) {
			gError.requestId = error.innerError["request-id"];
			gError.date = new Date(error.innerError.date);
		}
		try {
			gError.body = JSON.stringify(error);
		} catch (error) {
			// tslint:disable-line: no-empty
		}
		return gError;
	}
	/**
	 * @public
	 * @static
	 * @async
	 * To get the GraphError object
	 * @param {any} [error = null] - The error returned by graph service or some native error
	 * @param {number} [statusCode = -1] - The status code of the response
	 * @param {GraphRequestCallback} [callback] - The graph request callback function
	 * @returns A promise that resolves to GraphError instance
	 */
	static getError(error = null, statusCode = -1, callback) {
		return tslib_1.__awaiter(this, void 0, void 0, function*() {
			let gError;
			if (error && error.error) {
				gError = GraphErrorHandler.constructErrorFromResponse(error, statusCode);
			} else if (typeof Error !== "undefined" && error instanceof Error) {
				gError = GraphErrorHandler.constructError(error, statusCode);
			} else {
				gError = new GraphError(statusCode);
			}
			if (typeof callback === "function") {
				callback(gError, null);
			} else {
				return gError;
			}
		});
	}
}
//# sourceMappingURL=GraphErrorHandler.js.map
