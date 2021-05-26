/*
 *  Copyright 2021 EPAM Systems
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

import { Reporters } from '@wdio/types';
import { name as pjsonName, version as pjsonVersion } from '../package.json';
import { Attribute, Config, LaunchObj } from './models';

export const promiseErrorHandler = (promise: Promise<any>): void => {
  promise.catch((err) => {
    console.error(err);
  });
};

export const getClientConfig = (options: Partial<Reporters.Options>): Config => {
  const {
    token,
    endpoint,
    launch,
    project,
    rerun,
    rerunOf,
    skippedIssue,
    description,
    attributes,
    mode,
    debug,
    headers,
    restClientConfig,
  } = options;
  return {
    token,
    endpoint,
    launch,
    project,
    ...(rerun && { rerun }),
    ...(rerunOf && { rerunOf }),
    ...(skippedIssue && { skippedIssue }),
    ...(description && { description }),
    ...(attributes && { attributes }),
    ...(mode && { mode }),
    ...(debug && { debug }),
    ...(headers && { headers }),
    ...(restClientConfig && { restClientConfig }),
  };
};

export const getAgentInfo = (): { version: string; name: string } => ({
  name: pjsonName,
  version: pjsonVersion,
});

export const getSystemAttributes = (): Attribute[] => {
  return [
    {
      key: 'agent',
      value: `${pjsonName}|${pjsonVersion}`,
      system: true,
    },
  ];
};

export const getStartLaunchObj = (
  config: Partial<Reporters.Options>,
  launchObj: LaunchObj = {},
): LaunchObj => {
  const systemAttributes = getSystemAttributes();

  return {
    description: config.description,
    attributes: [...(config.attributes || []), ...systemAttributes],
    rerun: config.rerun,
    rerunOf: config.rerunOf,
    mode: config.mode,
    ...launchObj,
  };
};
