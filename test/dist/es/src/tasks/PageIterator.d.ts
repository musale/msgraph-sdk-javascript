/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/**
 * @module PageIterator
 */
import { FetchOptions } from "../IFetchOptions";
import { Client } from "../index";
import { MiddlewareOptions } from "../middleware/options/IMiddlewareOptions";
/**
 * Signature representing PageCollection
 * @property {any[]} value - The collection value
 * @property {string} [@odata.nextLink] - The nextLink value
 * @property {string} [@odata.deltaLink] - The deltaLink value
 * @property {any} Additional - Any number of additional properties (This is to accept the any additional data returned by in the response to the nextLink request)
 */
export interface PageCollection {
	value: any[];
	"@odata.nextLink"?: string;
	"@odata.deltaLink"?: string;
	[Key: string]: any;
}
/**
 * Signature to define the request options to be sent during request.
 * The values of the GraphRequestOptions properties are passed to the Graph Request object.
 * @property {HeadersInit} headers - the header options for the request
 * @property {MiddlewareOptions[]} middlewareoptions - The middleware options for the request
 * @property {FetchOptions} options - The fetch options for the request
 */
export interface GraphRequestOptions {
	headers?: HeadersInit;
	middlewareOptions?: MiddlewareOptions[];
	options?: FetchOptions;
}
/**
 * Signature representing callback for page iterator
 * @property {Function} callback - The callback function which should return boolean to continue the continue/stop the iteration.
 */
export declare type PageIteratorCallback = (data: any) => boolean;
/**
 * @class
 * Class for PageIterator
 */
export declare class PageIterator {
	/**
	 * @private
	 * Member holding the GraphClient instance
	 */
	private client;
	/**
	 * @private
	 * Member holding the page collection
	 */
	private collection;
	/**
	 * @private
	 * Member variable referring to nextLink of the page collection
	 */
	private nextLink;
	/**
	 * @private
	 * Member variable referring to deltaLink of the request
	 */
	private deltaLink;
	/**
	 * @private
	 * Holding callback for Iteration.
	 */
	private callback;
	/**
	 * @private
	 * Member holding a complete/incomplete status of an iterator
	 */
	private complete;
	/**
	 * Information to be added to the request
	 */
	private requestOptions;
	/**
	 * @public
	 * @constructor
	 * Creates new instance for PageIterator
	 * @param {Client} client - The graph client instance
	 * @param {PageCollection} pageCollection - The page collection object
	 * @param {PageIteratorCallback} callBack - The callback function
	 * @param {GraphRequestOptions} requestOptions - The request options
	 * @returns An instance of a PageIterator
	 */
	constructor(client: Client, pageCollection: PageCollection, callback: PageIteratorCallback, requestOptions?: GraphRequestOptions);
	/**
	 * @private
	 * Iterates over a collection by enqueuing entries one by one and kicking the callback with the enqueued entry
	 * @returns A boolean indicating the continue flag to process next page
	 */
	private iterationHelper;
	/**
	 * @private
	 * @async
	 * Helper to make a get request to fetch next page with nextLink url and update the page iterator instance with the returned response
	 * @returns A promise that resolves to a response data with next page collection
	 */
	private fetchAndUpdateNextPageData;
	/**
	 * @public
	 * Getter to get the deltaLink in the current response
	 * @returns A deltaLink which is being used to make delta requests in future
	 */
	getDeltaLink(): string | undefined;
	/**
	 * @public
	 * @async
	 * Iterates over the collection and kicks callback for each item on iteration. Fetches next set of data through nextLink and iterates over again
	 * This happens until the nextLink is drained out or the user responds with a red flag to continue from callback
	 * @returns A Promise that resolves to nothing on completion and throws error incase of any discrepancy.
	 */
	iterate(): Promise<any>;
	/**
	 * @public
	 * @async
	 * To resume the iteration
	 * Note: This internally calls the iterate method, It's just for more readability.
	 * @returns A Promise that resolves to nothing on completion and throws error incase of any discrepancy
	 */
	resume(): Promise<any>;
	/**
	 * @public
	 * To get the completeness status of the iterator
	 * @returns Boolean indicating the completeness
	 */
	isComplete(): boolean;
}
