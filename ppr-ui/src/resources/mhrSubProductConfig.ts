import { MhrSubTypes, MhrActions } from '@/enums/mhrSubProductActions'
import { SubProductConfigIF } from '@/interfaces'

export const MhrSubProductConfig: Array<SubProductConfigIF> = [
  {
    type: MhrSubTypes.GENERAL_PUBLIC,
    label: `Search Access Only - ${MhrSubTypes.GENERAL_PUBLIC}`,
    productBullets: [
      MhrActions.MHR_SEARCH
    ],
    hasImportantBullet: false
  },
  {
    type: MhrSubTypes.LAWYERS_NOTARIES,
    label: `${MhrSubTypes.QUALIFIED_SUPPLIER} - ${MhrSubTypes.LAWYERS_NOTARIES}`,
    productBullets: [
      MhrActions.MHR_SEARCH, MhrActions.TRANSPORT_PERMITS, MhrActions.TRANSFER_TRANSACTIONS,
      MhrActions.RESIDENTIAL_EXEMPTIONS, MhrActions.APPLICATION_REQUIRED
    ],
    hasImportantBullet: true,
    note: `General Service Providers who are not lawyers or notaries cannot request Qualified Supplier access online 
     and <a href="https://www2.gov.bc.ca/gov/content/housing-tenancy/owning-a-home/manufactured-home-registry" 
     target="_blank">must submit a paper application <span class="mdi mdi-open-in-new"></span></a> to BC Registries.`
  },
  {
    type: MhrSubTypes.MANUFACTURER,
    label: `${MhrSubTypes.QUALIFIED_SUPPLIER} - ${MhrSubTypes.MANUFACTURER}`,
    productBullets: [
      MhrActions.MHR_SEARCH, MhrActions.TRANSPORT_PERMITS, MhrActions.HOME_TRANSFER_TRANSACTIONS,
      MhrActions.REGISTRATIONS, MhrActions.APPLICATION_REQUIRED
    ],
    hasImportantBullet: true
  },
  {
    type: MhrSubTypes.DEALERS,
    label: `${MhrSubTypes.QUALIFIED_SUPPLIER} - ${MhrSubTypes.DEALERS}`,
    productBullets: [
      MhrActions.MHR_SEARCH, MhrActions.TRANSPORT_PERMITS_NO_CERT,
      MhrActions.APPLICATION_REQUIRED
    ],
    hasImportantBullet: true
  }
]