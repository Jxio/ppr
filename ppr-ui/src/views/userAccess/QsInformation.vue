<template>
  <div id="qs-information">
    <section class="qs-information-intro mt-10">
      <p>
        To request <strong>Qualified Supplier - {{ getMhrSubProduct }}</strong> access to the Manufactured Home
        Registry, complete the information below. BC Registries staff will review your application and if approved,
        will provide access.
      </p>

      <CautionBox
        class="mt-8"
        :setMsg="`This is intended for the exclusive use of B.C. ${getMhrSubProduct && getMhrSubProduct.toLowerCase()}
        only.`"
      />
    </section>

    <div class="increment-sections">
      <section class="qs-service-agreement mt-8">
        <h2>Qualified Suppliers’ Agreement</h2>
        <p class="mt-1">
          Read and accept the terms of the service agreement. You may download and a copy of this agreement to save for
          your records.
        </p>

        <ServiceAgreement :validate="validate" />
      </section>

      <section class="qs-information-form mt-8">
        <h2>Qualified Supplier ({{ getMhrSubProduct }}) Information</h2>
        <p class="mt-1">
          Provide the name and contact information for the Qualified Supplier.
        </p>

        <FormCard
          class="mt-4"
          label="Qualified Supplier"
          :showErrors="showQsInfoErrors"
          :class="{'border-error-left': showQsInfoErrors}"
        >
          <template #formSlot>
            <PartyForm
              ref="qsInformationRef"
              :baseParty="getMhrQsInformation"
              :schema="PartyFormSchema"
              :orgLookupConfig="orgLookupConfig"
              @isValid="updateQsInfoValid"
            >
              <template #businessNameSlot>
                <label
                  class="generic-label"
                  for="business-name"
                >{{ orgLookupConfig.pluralTitle }} Legal Business Name</label>
                <p class="mt-2">
                  {{ orgLookupConfig.lookupSubtitle }}
                </p>
              </template>

              <template #dbaNameSlot>
                <label
                  class="generic-label"
                  for="dba-name"
                >DBA (Doing Business As) or Operating Name</label>
                <p class="mt-2">
                  {{ orgLookupConfig.dbaLookupSubtitle }}
                </p>
              </template>
            </PartyForm>
          </template>
        </FormCard>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs, watch } from 'vue'
import { CautionBox, FormCard, PartyForm } from '@/components/common'
import { storeToRefs } from 'pinia'
import { useStore } from '@/store/store'
import { PartyFormSchema } from '@/schemas'
import { UserAccessOrgLookupConfig } from '@/resources'
import { OrgLookupConfigIF } from '@/interfaces'
import { ServiceAgreement } from '@/components/userAccess'

export default defineComponent({
  name: 'QsInformation',
  components: { CautionBox, FormCard, PartyForm, ServiceAgreement },
  props: { validate: { type: Boolean, default: false } },
  setup (props) {
    const qsInformationRef = ref(null) as any
    const { setMhrQsValidation } = useStore()
    const { getMhrQsInformation, getMhrSubProduct, getMhrUserAccessValidation } = storeToRefs(useStore())

    const localState = reactive({
      showQsInfoErrors: false,
      orgLookupConfig: computed((): OrgLookupConfigIF => UserAccessOrgLookupConfig[getMhrSubProduct.value])
    })

    const updateQsInfoValid = (isValid: boolean): void => {
      localState.showQsInfoErrors = !isValid
      setMhrQsValidation({ key: 'qsInformationValid', value: isValid })
    }

    watch(() => props.validate, () => {
      localState.showQsInfoErrors = (props.validate && !getMhrUserAccessValidation.value.qsInformationValid)
      qsInformationRef.value?.validatePartyForm()
    })

    return {
      qsInformationRef,
      PartyFormSchema,
      updateQsInfoValid,
      getMhrQsInformation,
      getMhrSubProduct,
      ...toRefs(localState)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';
:deep(.v-input--hide-details > .v-input__control > .v-input__slot) {
  display: flex;
  align-items: flex-start;
  .v-label {
    padding-left: 5px;
  }
}
</style>
