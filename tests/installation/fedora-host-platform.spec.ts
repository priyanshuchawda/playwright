/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { test, expect } from '@playwright/test';

import { getLinuxDistributionInfoSync } from '../../packages/utils/linuxUtils';
import { hostPlatform, isOfficiallySupportedPlatform, usesRpmPackageManager } from '../../packages/utils/hostPlatform';
import { deps } from '../../packages/playwright-core/src/server/registry/nativeDeps';

test('fedora host platform and native deps', async ({}) => {
  const distro = getLinuxDistributionInfoSync();
  test.skip(distro?.id !== 'fedora', 'runs on Fedora only');

  expect(hostPlatform).toMatch(/^fedora-(x64|arm64)$/);
  expect(isOfficiallySupportedPlatform).toBe(true);
  expect(usesRpmPackageManager(hostPlatform)).toBe(true);
  expect(deps[hostPlatform]?.chromium.length).toBeGreaterThan(10);
  expect(deps[hostPlatform]?.lib2package['libX11.so.6']).toBe('libX11');
});
